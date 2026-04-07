Create a statusline script for Claude Code at `~/.claude/statusline-command.sh` and configure it in `~/.claude/settings.json`.

## Constraints

- **Pure Bash only**. No Node.js, no Python, no jq, no external dependencies.
- Only use standard Unix commands: `bash`, `git`, `awk`, `sed`, `grep`, `basename`, `cat`.
- The script receives Claude Code's JSON status via **stdin**. Parse it with `awk`/`grep`/`sed` only.
- The script must be fast, simple, and print **one single line** to stdout.

## What to display

The statusline must show exactly 3 sections separated by `|`:

1. **📂 Current folder** — Use `basename "$PWD"` to get the real folder name. Do NOT read the folder from stdin JSON. Do NOT use any session ID or UUID. Just the plain directory name.
2. **📊 Context usage** — Parse the context usage percentage from the JSON that Claude Code pipes via stdin. Extract the percentage number and display it.
3. **🔀 Git branch** — Run `git rev-parse --abbrev-ref HEAD 2>/dev/null`. If not in a git repo, **omit this section entirely** (don't show the separator either).

## Expected output examples

Inside a git repo called "my-app" with 42% context used, on branch "main":

```
📂 my-app | 📊 ctx: 42% | 🔀 main
```

Inside a non-git folder called "documents" with 15% context used:

```
📂 documents | 📊 ctx: 15%
```

## settings.json configuration

Add this to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash ~/.claude/statusline-command.sh"
  }
}
```

## Common mistakes to avoid

- Do NOT use `$CLAUDE_SESSION_ID` or any UUID as the folder name.
- Do NOT rely on JSON fields for the working directory — always use `basename "$PWD"`.
- Do NOT use `jq` or `node` to parse JSON.
- Make sure to read **all of stdin** before processing (use `cat` to capture it into a variable first, then parse).
