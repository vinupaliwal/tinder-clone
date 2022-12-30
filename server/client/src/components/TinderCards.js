import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import './TinderCards.css'
import instance from './axios'

function TinderCards() {
  const [people, setPeople] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(PF+people.img);
  useEffect(() => {
    async function fetchData() {
      const req = await instance.get('/tinder/cards')
      setPeople(req.data)
    }

    fetchData()
  }, [])

  console.log(people)

  const swiped = (direction, nameToDelete) => {
    console.log('recovering' + nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen')
  }

  return (
    <div className='tinderCards'>
      <div className='tinderCards__cardContainer'>
        {people.map((person) => (
          <TinderCard
            className='swipe'
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwip={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${PF+person.img})` }}
              className='card'
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default TinderCards