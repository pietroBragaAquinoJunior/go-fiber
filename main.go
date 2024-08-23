package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/template/html/v2"
)

func RenderHomePage(c *fiber.Ctx) error {
    return c.Render("home", fiber.Map{})
}

func main() {
    app := fiber.New(fiber.Config{
        Views: html.New("./views", ".html"),
    })
    app.Static("/", "./static")
	app.Get("/", RenderHomePage)
    app.Listen(":8080")
}
