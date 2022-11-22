package main

import (
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// define post struct
type blogpost struct {
	ID        string    `json:"id"`
	Author    string    `json:"author"`
	Content   string    `json:"content"`
	Timestamp time.Time `json:"timestamp"`
}

// albums slice to seed record album data.
var blogposts = []blogpost{
	{ID: "1", Author: "alex", Content: "this is my first post", Timestamp: time.Now()},
	{ID: "2", Author: "alex", Content: "this is my second post", Timestamp: time.Now()},
	{ID: "3", Author: "alex", Content: "this is my third post", Timestamp: time.Now()},
}

// set default port number if env var $PORT isn't set
func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	port := getEnv("PORT", "8080")
	/*r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})*/
	router := gin.Default()
	//config := cors.DefaultConfig()
	//config.AllowAllOrigins = true
	router.Use(CORSMiddleware())
	//router.Use(cors.New(config))
	router.GET("/", getBasepath)
	router.GET("/blogposts", getBlogposts)
	router.GET("/blogposts/:id", getBlogpostByID)
	router.POST("/blogposts", postBlogposts)
	router.Run("0.0.0.0:" + port) // listen and serve on 0.0.0.0:8080 by default
}

// base path handler
func getBasepath(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{
		"hello": "base path",
	})
}

// getAlbums responds with the list of all albums as JSON.
func getBlogposts(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, blogposts)
}

// postAlbums adds an album from JSON received in the request body.
func postBlogposts(c *gin.Context) {
	var newBlogpost blogpost

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newBlogpost); err != nil {
		return
	}

	newBlogpost.Timestamp = time.Now()
	newBlogpost.ID = strconv.Itoa(len(blogposts) + 1) // mocking incrementing of ids of posts

	// Add the new album to the slice.
	blogposts = append(blogposts, newBlogpost)
	c.IndentedJSON(http.StatusCreated, newBlogpost)
}

// getAlbumByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that album as a response.
func getBlogpostByID(c *gin.Context) {
	id := c.Param("id")

	// Loop through the list of albums, looking for
	// an album whose ID value matches the parameter.
	for _, b := range blogposts {
		if b.ID == id {
			c.IndentedJSON(http.StatusOK, b)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "blog post not found"})
}
