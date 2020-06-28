/**
 * React renderer.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App'



// db.db.find({ "repository-type": "main" }, (err: any, docs: any) => {
//   console.log(`[story] ${docs}`);
//   console.log(docs)
//   if (docs.length == 0) {
//     db.createRepository();
//   }
//   else {
//     let defaultRepository = docs[0];
//     let des: String = "";
//     smalltalk
//       .prompt('Description', 'You should type description for this file', "")
//       .then((description: String) => {
//         des = description;
//         let tags: String = "tags";
//         smalltalk
//           .prompt('Tags', 'You should type tags with space \" \"', "example: c++ thread developing")
//           .then((tag: String) => {
//             let file = {
//               "owner-name": defaultRepository["repository-name"],
//               "file-path": name,
//               "description": des,
//               "tags": tag.split(" ").filter(n => n),
//             };
//             db.insert(file);
//           })
//           .catch(() => {
//             tags = "";
//           });
//       })
//       .catch(() => {
//         des = "no description";
//       });
//   }
// });

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
