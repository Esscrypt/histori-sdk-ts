#!/bin/bash

# Run the build command
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "Build successful, proceeding to cleanup."

  # Remove dist/__tests__ and dist/src directories
  echo "Removing unnecessary directories..."
  rm -rf dist/__tests__
  rm -rf dist/src

  # Run npm pack to create the tarball
  echo "Running npm pack..."
  npm pack

  echo "Package created successfully."
else
  echo "Build failed, exiting."
  exit 1
fi
