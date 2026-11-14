/**
 * A local-only dependency-free preview for the static Skillbook.
 * Usage: node scripts/local-preview.mjs [port]
 */
import {createServer} from 'node:http';
import {createReadStream} from 'node:fs';
import {stat,realpath} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,sep,extname} from 'node:path';

const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const canonicalRoot=await realpath(root);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/markdown; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.csv':'text/csv; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const secretSegments=new Set(['.git','node_modules','qa-evidence','qa-evidence-local','.env','.github','.npmrc','.pypirc','.ssh','.aws']);
const isSensitiveSegment = segment => {
  // NTFS is normally case-insensitive; use one consistent deny rule on all OSes.
  const name=segment.toLowerCase();
  return secretSegments.has(name) || name.startsWith('.env.');
};
const deny=res=>{res.writeHead(403,{'Content-Type':'text/plain; charset=utf-8'});res.end('Forbidden');};
export function createPreviewServer(){
 return createServer(async (req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){
   res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;
  }
  let name;
  try{
   const u=new URL(req.url,'http://localhost');
   name=decodeURIComponent(u.pathname);
   if(name.includes('\0')||name.includes('\\')){deny(res);return;}
  }catch{res.writeHead(400);res.end('Bad URL');return;}
  const parts=name.split('/').filter(Boolean);
  if(parts.some(isSensitiveSegment)){deny(res);return;}
  const candidate=resolve(root,'.'+(name.endsWith('/')?name+'index.html':name));
  if(candidate!==root&&!candidate.startsWith(root+sep)){deny(res);return;}
  let st,canonical;
  try{
    canonical=await realpath(candidate);
    st=await stat(candidate);
  }catch{res.writeHead(404);res.end('Not found');return;}
  // A symlink may escape the repository even when its lexical path is safe.
  if(canonical!==canonicalRoot&&!canonical.startsWith(canonicalRoot+sep)){deny(res);return;}
  // Lexical path checks alone are insufficient: an in-tree symlink could alias
  // .git, .env.*, .ssh, etc. Deny sensitive segments in the resolved path too.
  const resolvedParts=canonical.slice(canonicalRoot.length).split(sep).filter(Boolean);
  if(resolvedParts.some(isSensitiveSegment)){deny(res);return;}
  if(st.isDirectory()){
   const location=name.endsWith('/')?name+'index.html':name+'/index.html';
   res.writeHead(302,{Location:location});res.end();return;
  }
  if(!st.isFile()){deny(res);return;}
  res.writeHead(200,{
   'Content-Type':types[extname(candidate).toLowerCase()]||'application/octet-stream',
   'X-Content-Type-Options':'nosniff','Cache-Control':'no-store',
   'Content-Length':st.size
  });
  if(req.method==='HEAD'){res.end();return;}
  createReadStream(canonical).on('error',()=>res.destroy()).pipe(res);
 });
}
export async function startPreview(port=0){
 const srv=createPreviewServer();
 await new Promise((ok,bad)=>{srv.once('error',bad);srv.listen(port,'127.0.0.1',ok);});
 return {server:srv,url:'http://127.0.0.1:'+srv.address().port+'/'};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const port=Number(process.argv[2]||8765);
 if(!Number.isInteger(port)||port<1||port>65535)throw Error('Port must be in range 1–65535');
 const {url}=await startPreview(port);
 console.log('Skillbook local preview: '+url);
 console.log('Only 127.0.0.1 is listening. Press Ctrl+C to stop.');
}
