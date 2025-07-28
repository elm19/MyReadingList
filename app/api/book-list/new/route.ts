// import { NextResponse } from 'next/server'



// // For App Router
// export async function POST(request) {
//   try {

//     // Parse request body
//     const body = await request.json()
//     const { 
//       name, 
//       description = '', 
//       books = [],  // Array of book objects: [{ name, author, description?, type?, source_id? }]
//       is_private = false 
//     } = body

//     // Validate required fields
//     if (!name?.trim()) {
//       return NextResponse.json(
//         { error: 'Book list name is required' }, 
//         { status: 400 }
//       )
//     }

//     // Validate books array
//     if (!Array.isArray(books)) {
//       return NextResponse.json(
//         { error: 'Books must be an array' }, 
//         { status: 400 }
//       )
//     }

//     for (const book of books) {
//       if (!book.name?.trim() || !book.author?.trim()) {
//         return NextResponse.json(
//           { error: 'Each book must have a name and author' }, 
//           { status: 400 }
//         )
//       }
//     }

//     // Start transaction by creating the book list first
//     const listSlug = await ensureUniqueSlug(supabase, generateSlug(name), 'book_lists')
    
//     const { data: bookList, error: listError } = await supabase
//       .from('book_lists')
//       .insert([{
//         id: listSlug,
//         name: name.trim(),
//         description: description.trim(),
//         creator_id: user.id,
//         is_private: is_private
//       }])
//       .select()
//       .single()

//     if (listError) {
//       console.error('Error creating book list:', listError)
//       return NextResponse.json(
//         { error: 'Failed to create book list' }, 
//         { status: 500 }
//       )
//     }

//     // Process books if any
//     const createdBooks = []
//     const listBooks = []

//     for (const bookData of books) {
//       try {
       

//         // Check if book already exists by name and author
//         const { data: existingBook } = await supabase
//           .from('books')
//           .select('id')
//           .eq('name', bookData.name.trim())
//           .eq('author', bookData.author.trim())
//           .single()

//         let bookId

//         if (existingBook) {
//           // Book already exists, use existing ID
//           bookId = existingBook.id
//         } else {
//           // Create new book
//           const { data: newBook, error: bookError } = await supabase
//             .from('books')
//             .insert([{
//               id: bookSlug,
//               name: bookData.name.trim(),
//               description: bookData.description?.trim() || '',
//               author: bookData.author.trim(),
//               type: bookData.type || 'EN', // Default to English Novel
//               source_id: bookData.source_id || null,
//               is_complete: bookData.is_complete || false,
//               created_by: user.id
//             }])
//             .select()
//             .single()

//           if (bookError) {
//             console.error('Error creating book:', bookError)
//             // Continue with other books, don't fail the entire operation
//             continue
//           }

//           bookId = newBook.id
//           createdBooks.push(newBook)
//         }

//         // Add book to the list
//         const { data: listBook, error: listBookError } = await supabase
//           .from('list_books')
//           .insert([{
//             book_list_id: bookList.id,
//             book_id: bookId,
//             added_by: user.id
//           }])
//           .select(`
//             id,
//             added_at,
//             books:book_id (
//               id,
//               name,
//               author,
//               description,
//               type,
//               is_complete
//             )
//           `)
//           .single()

//         if (listBookError) {
//           console.error('Error adding book to list:', listBookError)
//           continue
//         }

//         listBooks.push(listBook)

//       } catch (error) {
//         console.error('Error processing book:', bookData.name, error)
//         // Continue with other books
//         continue
//       }
//     }

//     // Return the created book list with books
//     return NextResponse.json({
//       success: true,
//       data: {
//         book_list: bookList,
//         books: listBooks,
//         created_books: createdBooks,
//         total_books: listBooks.length
//       }
//     }, { status: 201 })

//   } catch (error) {
//     console.error('API error:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' }, 
//       { status: 500 }
//     )
//   }
// }
