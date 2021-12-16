import React from 'react'

const About = () => {
    return (
        <div>
            <h1>About This App</h1>
            <p className='my-1'>
                Hey there, this app is a basic design with cool functionality demonstrating full stack build with MongoDb, Express, React and Node.js.
                This was a fun project, using context api, using mongoDB atlas for the backend, Also showing the data on the front end.

                A user can login and keep a list of contacts that is stored to the data base, only that user can edit and delete their own contacts.There is user authentication using a json webToken. Each contact has a unique id attached to the user that also has a unique id to login and populate the database.

                One form will control all the data, you can see how we used react to make it a "reactive" user experience.
                Full Stack Crud App, Create a contact List.
            </p>
            <p className='bg-dark p'>
                <strong>VSchool: </strong> CAPSTONE Level 5
            </p>
        </div>
    )
}

export default About
