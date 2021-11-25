# HelloBuild client (for entry test)

## Docker

To run this server with docker you must follow the next steps:

1. Clone this repo.
2. Download docker (if you don't have docker).
3. Build the docker image (in the terminal of this downloaded repo).
    ```bash
   docker build  -t hello_build_client .
    ```
4. Run the previous built image.
    ```bash
   docker run -d -p 3000:3000 hello_build_client
   ```
---
## Without Docker

To run this server without docker you must follow the next steps:
1. Clone this repo.
2. In the terminal of this downloaded repo execute:
   ```bash
    npm install
    npm run start
   ```

   

