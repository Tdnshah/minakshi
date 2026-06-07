# Custom Instructions for GitHub Copilot

1. Never add copilot reference to git commit message.
2. Branch workflow recap 
    ✅ develop exists; cut from master, now ahead with design system + this polish
    ✅ All future branches: git checkout develop && git pull && git checkout -b feat/<name>
    ✅ Merge target: develop (release-time: develop → master)

3. For code style, refer to app/DESIGN-ARCHITECTURE.md, especially the DRY + reuse constraints section.
