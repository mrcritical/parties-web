import * as firebase from "firebase";
import "firebase/firestore";
import type {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    QuerySnapshot
} from '@firebase/firestore';

export type {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    QuerySnapshot,
}

export default firebase.firestore();