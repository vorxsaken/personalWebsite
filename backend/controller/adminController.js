import { mongo } from "../mongodb.js";

export async function Login(req, res){

}

export async function addPost(req, res) {
    try {
        const database = await mongo.db('fahmi').collection('basyar').insertOne({
            name: "vorxsaken"
        });
        res.send(database);
        mongo.close();
    } catch (err) {
        console.log(err);
    }
}