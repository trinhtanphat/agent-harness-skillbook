# MCP stdio demo — protocol revision 2026-07-28

This **teaching-only** server implements a deliberately small subset of the modern stateless [MCP 2026-07-28 protocol](https://modelcontextprotocol.io/specification/2026-07-28/). It is not a full MCP SDK and should **not** be deployed as a production server.

## Major version change

- **2025-11-25 and earlier:** session-scoped \`initialize\` / \`notifications/initialized\`.
- **2026-07-28:** no initialize handshake; \`server/discover\` and mandatory per-request \`_meta\` with protocol version/client capabilities; \`resultType\` in result responses.
- New servers need to implement tool execution errors as \`isError: true\` for correctable input validation; unknown methods/tools use JSON-RPC errors.
- For compatibility with older MCP hosts, use a version-aware SDK that can negotiate both eras; this sample deliberately supports only \`2026-07-28\`.

## Run

\`\`\`bash
node examples/mcp-stdio-demo/client-smoke.mjs
\`\`\`

Expected PASS covers: discovery, metadata, list, call, invalid input, unknown tool, unsupported version and missing meta. Node.js 22+; no packages.

Manual protocol example (one JSON-RPC object per stdin line):

\`\`\`json
{"jsonrpc":"2.0","id":1,"method":"server/discover","params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientCapabilities":{},"io.modelcontextprotocol/clientInfo":{"name":"demo","version":"1.0.0"}}}}
\`\`\`

This demo **does not read local files, credentials, network, or browser sessions**. Run only locally. Do not expose it as unauthenticated HTTP.

## For real MCP apps

Use the maintained official [TypeScript SDK v2](https://ts.sdk.modelcontextprotocol.io/v2/) or the [Python SDK](https://py.sdk.modelcontextprotocol.io/). Configure version negotiation and validate cross-era compatibility with actual target clients.

References: [MCP discover](https://modelcontextprotocol.io/specification/2026-07-28/server/discover), [MCP tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools), [versioning](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning).
