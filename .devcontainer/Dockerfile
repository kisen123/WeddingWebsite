FROM mcr.microsoft.com/devcontainers/dotnet:1-9.0-bookworm

# Remove the stale Yarn apt repo that ships with the base image.
# Its GPG key is untrusted, which causes apt-get update to fail during
# devcontainer feature installation (docker-outside-of-docker, node, etc.).
RUN rm -f /etc/apt/sources.list.d/yarn.list