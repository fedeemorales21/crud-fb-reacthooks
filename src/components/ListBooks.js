import React, { useState, useEffect } from 'react'
import FormBooks from './FormBooks'
import { db } from "../authFirebase";
import { toast } from 'react-toastify'

export default function ListBooks() {

    const [listBooks, setListBooks] = useState([])
    const [id, setId] = useState('')

    const addEditBook = async bookObject => {
        if (id === '') {      
            await db.collection('books').doc().set(bookObject)
            toast('Book Added', {
                type: 'success',
                autoClose: 2000
            })
        }else{
            await db.collection('books').doc(id).update(bookObject)
            toast('Book Updated', {
                type: 'info',
                autoClose: 2000
            })
            setId('')
        }
    }

    const getBooks = async () => {
        db.collection('books').onSnapshot( qs => {
            const list = []
            qs.forEach(doc =>{
                list.push( {...doc.data(), id: doc.id} )
            })
            setListBooks(list)
        })
    }

    useEffect(() => {
        getBooks()
    }, [])

    const deleteBook = async idBook => {
       await db.collection('books').doc(idBook).delete()
       toast('Book deleted', {
           type: 'error',
           autoClose: 2000
       })
    }

    return (
        <div>
            <FormBooks
            {  ...{ addEditBook, id } }
            />

            {
                listBooks.map( book => (
                    <div className="card" key={book.id}>
                        <div className="card-body">
                            <h2>{book.name}</h2>
                            <p>{book.author}</p>
                            <small>{book.isbn}</small>
                            <br/>
                            <button className="btn btn-danger" onClick={() => deleteBook(book.id) }>
                                Delete
                            </button>
                            <button className="btn btn-warning" onClick={() => setId(book.id)} >
                                Edit
                            </button>
                        </div>
                    </div>

                ) )
            }
            
        </div>
    )
}
