do_nothing = {
    {
      "type": "function",
      "function": {
          "name": "do_nothing",
          "description": "Use this tool when you don't need to do anything, you only need to respond to the user's question.",
          "parameters": {},  
          "strict": True
      }
  }
}

add_favourites = {
    {
      "type": "function",
      "function": {
          "name": "add_favourites",
          "description": "Use this tool when the user wants to add a product to their favorites.",
          "parameters": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "The ID of the product to add to favorites."
            },
            "required": ["product_id"],
            "additionalProperties": False
          },  
          "strict": True
      }
  }
}

open_favourites = {
    {
      "type": "function",
      "function": {
          "name": "open_favorites",
          "description": "Use this tool when the user wants to open their favorites.",
          "parameters": {},
          "strict": True
      }
  }
}

remove_favourite = {
    {
      "type": "function",
      "function": {
          "name": "remove_favourite",
          "description": "Use this tool when the user wants to remove a product from their favorites.",
          "parameters": {},
          "strict": True
      }
  }
}

view_product = {
  
}

ask_user = {
  
}

go_to_cart = {
  
}

tools = [
  {
      "type": "function",
      "function": {
          "name": "get_weather",
          "description": "Get current temperature for a given location.",
          "parameters": {
              "type": "object",
              "properties": {
                  "location": {
                      "type": "string",
                      "description": "City and country e.g. Bogotá, Colombia"
                  }
              },
              "required": [
                  "location"
              ],
              "additionalProperties": False
          },  
          "strict": True
      }
  }
]