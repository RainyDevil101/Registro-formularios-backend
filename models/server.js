const express           = require('express');
const cors              = require('cors');
const fileUpload        = require('express-fileupload');
const { dbConnection }  = require('../database/config');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.paths  = {
            auth:           '/api/auth',
            forums:         '/api/forums',
            roles:          '/api/roles',
            tasks:          '/api/tasks',
            ubications:     '/api/ubications',
            users:          '/api/users',
            uploads:        '/api/uploads',
        }

        //Database connect
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Application routes
        this.routes();
    }
    async conectarDB() {
        await dbConnection()
    }
    middlewares() {  

        //CORS

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        })

        //Lecture
        this.app.use( cors() );
        this.app.use( express.json() );

        //Public directory
        this.app.use( express.static('public') )

        //Fileupload - Files
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }

    routes() {
        this.app.use(this.paths.auth,       require('../routes/auth.routes'));
        this.app.use(this.paths.forums,     require('../routes/forums.routes'));
        this.app.use(this.paths.roles,      require('../routes/roles.routes'));
        this.app.use(this.paths.tasks,      require('../routes/tasks.routes'));
        this.app.use(this.paths.ubications, require('../routes/ubications.routes'));
        this.app.use(this.paths.users,      require('../routes/user.routes'));
        this.app.use(this.paths.uploads,    require('../routes/uploads.routes'));
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor up!', this.port)
        });
    }

}

module.exports = Server;