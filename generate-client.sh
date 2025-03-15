# Needs the following executables:
# - protoc
# - protoc-gen-js
# - protoc-gen-grpc-web

protoc -I=. src/proto/game.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=typescript,mode=grpcwebtext:.