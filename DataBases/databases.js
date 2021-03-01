const Sequelize = require("sequelize");

const connection = new Sequelize('da1i1bcmrp89ss','ttsgwultjbdglu','d1e43edbcf3886c3f02ef798f177a2dcd35aa8edfcb8691d847ad2e4f00e085b',{
    host:'ec2-34-194-215-27.compute-1.amazonaws.com',
    dialect: 'postgres',
    //configurando timezone
    timezone: "-03:00",
    logging:false //Remove log do terminal
})
// mysql://b4be845f37ea68:295062e4@us-cdbr-east-03.cleardb.com/heroku_9b63551fa2f9a8f?reconnect=true
module.exports = connection;

//https://help.heroku.com/DR0TTWWD/seeing-fatal-no-pg_hba-conf-entry-errors-in-postgres
//https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
//https://devcenter.heroku.com/articles/heroku-postgresql#heroku-postgres-ssl

//https://medium.com/@ochieng.grace/sequelize-your-way-to-heroku-with-express-2c31be3752e0


//heroku config:set PGSSLMODE=no-verify
//heroku pg:reset DATABASE --confirm produtosenderecamento
//set DATABASE_URL=postgres://$(whoami)

//heroku git:remote -a thawing-inlet-61413

