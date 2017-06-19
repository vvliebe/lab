install: 
	@cd www && npm install
	@cd admin && npm install

www@build: 
	@cd www && npm run build

www@dev: 
	@cd www && npm run dev
