import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyAqGzRGsNMI_LQPZKsJEz8SrH8gVMjj7Rg",
  authDomain: "wani-samaj.firebaseapp.com",
  projectId: "wani-samaj",
  storageBucket: "wani-samaj.appspot.com",
  messagingSenderId: "236432959431",
  appId: "1:236432959431:web:dbbe6674c7f310acabdbe2"
};


const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore()
const profileCollection = db.collection('Profiles')
const info = db.collection('Info');
const documentCollection = db.collection('Docs');
const notif = db.collection('Notifications');

export const getAllReceipt = async (year) => {
  const receiptDetails = [];
  const res = await documentCollection.where('type','==','receipt').where('year','==',year).get()
  res.forEach(doc => {
    receiptDetails.push({ ...doc.data(), id: doc.id });
  });
  console.log(receiptDetails);
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Note: months are 0-based in JavaScript Date
  };
  
  // Sort the array of objects based on the 'date' field
  receiptDetails.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  return receiptDetails;
}

export const getResult = async (year) => {
  const resultDetails = [];
  const res = await documentCollection.where('type','==','result').where('year','==',year).orderBy('grade').orderBy('marks').get()
  console.log(res);
  res.forEach(doc => {
    resultDetails.push({ ...doc.data(), id: doc.id });
  });
  console.log(resultDetails);
  return resultDetails;
}

export const getDocument = async (year) => {
  const resultDetails = [];
  const res = await documentCollection.where('type','==','others').where('year','==',year).get()
  console.log(res);
  res.forEach(doc => {
    resultDetails.push({ ...doc.data(), id: doc.id });
  });
  console.log('docs',resultDetails);
  return resultDetails;
}

export const getAllInfo = async () => {
  let profileDetails = [];
  const profile = await info.where('head','==',true).get();

  profile.forEach(doc => {
    profileDetails.push({ ...doc.data(), id: doc.id });
  });

  return profileDetails;
}

export const getAllInfoForEmail = async () => {
  let profileDetails = [];
  const profile = await info.get();

  profile.forEach(doc => {
    profileDetails.push({ ...doc.data(), id: doc.id });
  });

  return profileDetails;
}



export const addProfile = async (obj) => {
  console.log(obj);
  const docId = `${obj.name}${obj.dob}${obj.email}`;
  console.log(docId);
  info.doc(docId).set(obj);
  const response = await profileCollection.doc(obj.email).collection('Members').doc(docId).set(obj);
  console.log(response);
};

export const setApproved = async (id,msg,receiptNumber,approvedDate) => {
  const obj = {approved: true,rejectionMessage: msg,receiptNumber,approvedDate};
  const res = await documentCollection.doc(id).update(obj);
  return res;
}

export const addDocument = async (obj) => {
  console.log(obj);
  documentCollection.add(obj);
};

export const rejected = async (id, obj) => {
  console.log('calyx', obj);
  const res = await documentCollection.doc(id).update(obj);
  return res;
}


export const deleteMember = async(item) => {
  console.log('deleteMember', item.email);
  const profs = await profileCollection.doc(item.email).collection(`Members`).get();
  console.log(profs);
  profs.forEach(docu => {
    profileCollection.doc(item.email).collection(`Members`).doc(docu.id).delete();
    info.doc(docu.id).delete();
  });
}

export const addMailer = async(obj) => {
  console.log(obj);
  await notif.add(obj);
}

export const getNotifs = async() => {
  const details = [];
  const res = await notif.get();

  res.forEach(doc => {
    details.push({ ...doc.data(), id: doc.id });
  });
  console.log(details);
  return details;
}

export const getNums = async() => {
  const details = [];
  const details2 = [];
  let obj = {
    head: 0,
    members: 0
  };

  const res = await info.get();
  res.forEach(doc => {
    //console.log('calyx doc', doc)
    details.push(doc.id);
  });
  obj.members = details.length;
  const res2 = await info.where('head', '==', true).get();
  res2.forEach(doc => {
    //console.log('calyx doc', doc)
    details2.push(doc.id);
  });
  obj.head = details2.length
  console.log('calyx count', obj);
  return obj;
}

export const deleteNotifs = async(id) => {
  await notif.doc(id).delete();
}