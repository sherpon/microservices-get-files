
const addFileToDb = async (firestore, websiteId) => {
  return new Promise((resolve, reject) => {
    const filesRef = firestore.collection('websites').doc(websiteId).collection('files');
    filesRef.get()
    .then(snapshot => {
      let files = [];
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        const file = {...doc.data(), filename: doc.id, createdAt: doc.data().createdAt._seconds * 1000};
        files.push(file);
      });
      resolve(files);
    })
    .catch(err => {
      console.error('Error getting documents', err);
      reject(err);
    });
  });
};

module.exports = addFileToDb;