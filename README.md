# Manga-rh_backend
Back-end for MangaRH, an rh management solution. Deployed <a href="https://manga-rh.herokuapp.com/"> here </a>!

## Routes

> GET /collaborator: Return all registered collaborators;

> GET /collaborator/:name: Return collaborator details;

> GET /knowledges: Return all registered knowledges;

> POST /collaborator: Register new collaborator;
 
> POST /collaborator/:id/validate: Validate collaborator;
 
> POST /collaborator/:id/unvalidate: Unvalidate collaborator;
 

## How to run
1. Clone this repository
2. Install all dependencies
```bash
npm i
```
3. Create a PostgreSQL database with whatever name you want
4. Configure the `test.env` file using the `.env.example` file
5. Run the back-end in a development environment:
```bash
npm run start:dev
```
6. Populate knowledges table in your database with 
```
INSERT INTO knowledges (name) VALUES ('example');
```
