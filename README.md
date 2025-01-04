# **Social Media Platform**

## **Description**  

A feature-rich social media platform where users can create accounts, share posts with text, images, and videos, engage with posts through likes and comments, and connect with others by following their profiles.

---

## **Features**  

- **User Authentication & Authorization:** Secure user registration and login using JWT.  
- **Posts & Updates:** Create, edit, and delete posts with text, images, or videos.  
- **Engagement:** Like and comment on posts.  
- **User Connections:** Follow and unfollow other users.  
- **Profile Page:** View your timeline with posts and updates.

---

## **Technologies Used**  

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JWT (JSON Web Token), bcrypt for password hashing  
- **Frontend:** Next.js  

---

## **API Endpoints**  

### **User Endpoints**  

- **Register a User:** Create a new account.  
- **Login a User:** Authenticate and access the platform.  
- **Get User Profile:** Retrieve user profile details.  
- **Update Profile:** Edit profile information.  

### **Post Endpoints**  

- **Create a Post:** Share updates with text, images, or videos.  
- **Retrieve Posts:** Fetch all posts or a specific post.  
- **Update a Post:** Modify an existing post.  
- **Delete a Post:** Remove a post permanently.  

### **Engagement Endpoints**  

- **Like a Post:** Express interest in a post.  
- **Comment on a Post:** Add feedback or thoughts to a post.  

### **Follow Endpoints**  

- **Follow a User:** Start following a user.  
- **Unfollow a User:** Stop following a user.  

---

## **Authentication**  

This platform uses **JWT (JSON Web Token)** to ensure secure authentication and authorization. Only registered and logged-in users can access platform features.  

---

## **User Profile**  

The user profile page includes a timeline showcasing all posts made by the user.  

---

## **Post Engagement**  

Users can:  

- **Like:** Express appreciation for posts.  
- **Comment:** Share feedback or join the conversation.  

---

## **Follow System**  

Users can connect with others by following their profiles and viewing their timeline of posts.  

---

## **Database Schema**  

The project employs MongoDB for database management, with Mongoose as the Object Data Modeling (ODM) library. The schema supports:  

- User accounts and profiles.  
- Posts, comments, and likes.  
- Follow relationships.  

---

## **Installation**  

### **Steps to Install:**  

1. **Clone the Repository:**  

   ```bash  
   git clone https://github.com/nowshen-khan/social-media-platform.git  
   cd social-media-platform  
    npm install  
    npm run dev  
    ```

## Usage Instructions
1. Register a new account.
2. Login to your account.
3. Create, edit, or delete posts.
4. Like and comment on posts from other users.
5. Follow other users and view their updates.
6. Access your profile to view your timeline.

## Deployment
The platform is deployable on cloud services like Heroku, AWS, or similar platforms.

## Contributing
Contributions are welcome! Follow these steps to contribute:

## Fork the repository.
1. Create a new branch.
2. Implement your changes.
3. Commit and push your changes.
4. Submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, reach out via email at: [nowshen.anjum@gmail.com]

## Acknowledgments
This project was created by [Nowshen Anjuman Khan].

## Thank You
Thank you for using the Social Media Platform! We hope you have a great experience and enjoy connecting with others.