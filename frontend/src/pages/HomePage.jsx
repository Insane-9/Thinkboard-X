import {useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RateLimitedUI'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import NoteCard from '../Components/NoteCard'
import api from '../lib/axios'
import { Link } from 'react-router'

const Homepage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes:", error)
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true)
        }else{
          toast.error("Failed to fetch notes")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {notes.length ===0 && !loading && !isRateLimited && (
        <div className='text-center text-primary mt-10'>
          <div className='text-6xl mb-4'>📝</div>
          <h2 className='text-2xl font-semibold mb-4'>No notes available.</h2>
          <Link to="/create"><button className='btn btn-primary'>Create New</button></Link>
        </div>
        )}
        
        {notes.length > 0 && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

          {notes.map((note) => (
            <NoteCard note={note} key={note._id} setNotes={setNotes} />
          ))}

          </div>}

      </div>
    </div>
  )
}

export default Homepage
