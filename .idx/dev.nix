# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # We add nodejs for a JavaScript environment and http-server to serve static files.
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.http-server
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "google.gemini-cli-vscode-ide-companion"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # This preview starts a web server to serve the 'dist' directory.
        web = {
          # Command to run: `http-server` serves the specified directory.
          # The `-p $PORT` flag is crucial to use the port assigned by IDX.
          # `--cors` is added to prevent common cross-origin issues.
          command = [ "http-server" "dist" "-p" "$PORT" "--cors" ];
          # 'web' manager opens the preview in a browser tab inside IDX.
          manager = "web";
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ ".idx/dev.nix" "README.md" ];
      };
      # Runs when the workspace is (re)started
      onStart = {
        # No onStart tasks needed for this configuration.
      };
    };
  };
}
