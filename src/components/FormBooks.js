import React, { useState, useEffect } from "react";
import { db } from "../authFirebase";

export default function FormBooks({ addEditBook, id }) {

    const initialState = {
        name : '',
        author: '',
        isbn: ''
    }

    const [book, setBook] = useState(initialState)

    useEffect(() => {
        if (id === '') {
            setBook(initialState) 
        }else{
            getBookPerID(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const getBookPerID = async bookId => {
        try {
            const doc = await db.collection('books').doc(bookId).get()
            setBook({...doc.data()})
        } catch (error) {
            console.log(error)
        }    
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!book.author || !book.name || !book.isbn ) {
            return false
        }
        addEditBook(book)
        setBook(initialState)
    }

    const handleInputs = e => {
        const { name, value } = e.target
        setBook({...book, [name]: value })
    }

    return (
        <div className="card mb-4">

            <form className="card-body" onSubmit={handleSubmit} autoComplete="off">

                <div className="form-group">
                    <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    onChange={ handleInputs }
                    value={ book.name }
                    />
                </div>

                <div className="form-group">
                    <input
                    type="text"
                    className="form-control"
                    name="author"
                    placeholder="Author"
                    onChange={ handleInputs }
                    value={ book.author }
                    />
                </div>

                <div className="form-group">
                    <input
                    type="text"
                    className="form-control"
                    name="isbn"
                    placeholder="ISBN"
                    onChange={ handleInputs }
                    value={ book.isbn }
                    />
                </div>

                <div className="form-group">
                    <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    value={ id === '' ? 'Save': 'Update' }
                    />
                </div>

            </form>
        </div>
        
    )
}
