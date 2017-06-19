install: 
	@cd www && npm install
	@cd admin && npm install
	@cd backend && npm install

build: 
	@cd www && npm run build
	@cd backend && npm run build

www@dev: 
	@cd www && npm run dev

backend@dev:
	@cd backend && npm run dev
