var express = require('express')
var path = require('path');
var app = express();
var multer = require('multer');
var axios = require('axios');
var {MongoClient, ObjectId} = require('mongodb');
var {makeExecutableSchema} = require( 'graphql-tools');


app.listen(3000, () => console.log('Example app listening on port 3000!'))


app.use(express.static(path.join(__dirname, '../public'))); // services all the static resources like html files, css , etc.

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });




app.post('/fileUpload', upload.single('file'), (req, res) => {
 const file = req.file; // file passed from client
 const meta = req.body; // all other values passed from the client, like name, etc..
 console.log(file);
 res.send('File Uploaded Successfully')
 // send the data to our REST API
 // axios({
 //    url: `https://api.myrest.com/uploads`,
 //    method: 'post',
 //    data: {
 //      file,
 //      name: meta.name,
 //    },
 //  })
 //   .then(response => res.status(200).json(response.data.data))
 //   .catch((error) => res.status(500).json(error.response.data));
});
// var { graphql, buildSchema } = require('graphql');
//
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };
//
// // Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// });

const db = MongoClient.connect('mongodb://localhost:27017/userdb')
const Employees = db.collection('employees')

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

const typeDef= [`
  type Query {
        byID(_id: String): Employees
        all: [Employees]
        byName(name: String): [Employees]
      }


  type Employees{
    _id :String
    name: String
    gender: String
    salary: String
    dateOfJoin: String
    prevExp: String
  }

  type Mutation {
  editEmployee(id :String, name: String): Employees
  deleteEmployee(id :String): Employees
}

  schema {
        query: Query
        mutation: Mutation
      }
`]
const resolvers =  {
  Query: {
         byID:  (root, {_id}) => {
           return prepare( Posts.findOne(ObjectId(_id)))
         },
         all:  () => {
           return ( Posts.find({}).toArray()).map(prepare)
         },
       },

}

const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })



    // var model = mongoXlsx.buildDynamicModel(data);
    // var schema = {}
    //
    // model.forEach((data,index)=>{
    //   schema[data.displayName] = data.type.charAt(0).toUpperCase()+ data.type.slice(1)
    // })

    //console.log(schema);
    // console.log(schema);
    // var empObj = mongoose.model('mySchema',schema);

    // console.log(empObj);
    // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',employeeSchema);
