# NL to SQL Project

## Development Setup

### Automated Setup (Recommended)

After cloning the repository, simply run the appropriate setup script for your operating system:

**For Linux/Mac:**
```bash
# Make the script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

The setup script will automatically:
- Install Black linter for Python
- Install pre-commit hooks
- Set up the frontend dependencies
- Run initial linting on your codebase


### Making Changes

Now, whenever you make changes:
1. The code will be automatically linted when you commit
2. If any linting errors are found, the commit will be rejected
3. Fix the errors and try committing again

You can also manually run these tools at any time:
- For backend: `black backend/`
- For frontend: `cd frontend && npm run lint`
- For all pre-commit hooks: `pre-commit run --all-files`
