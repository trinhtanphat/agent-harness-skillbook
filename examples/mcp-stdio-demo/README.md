# MCP stdio demo — Node.js, zero dependencies

This is a **learning-only** implementation of a small JSON-RPC MCP server. It exposes two harmless tools: add_numbers and build_scope_checklist. It reads no files, uses no network, and receives no credentials. For production integrations, use the current official MCP SDK and security guidelines.

## Run smoke tests

~~~bash
node examples/mcp-stdio-demo/client-smoke.mjs
~~~

Expected result: PASS for initialize, tools/list, tools/call, invalid input and checklist. This is not a production compliance suite.

## Manual transport

Run server:

~~~bash
node examples/mcp-stdio-demo/server.mjs
~~~

Send one JSON-RPC object per line through stdin and read one response line from stdout:

~~~json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"demo","version":"1"}}}
~~~

Then send the initialized notification and tools/list. The transport is local only; **do not expose this teaching process as an unauthenticated remote HTTP service**.

See [MCP docs](https://modelcontextprotocol.io/) for latest wire details and an SDK-built server.
