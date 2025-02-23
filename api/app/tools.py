do_nothing = {
    "type": "function",
    "function": {
        "name": "do_nothing",
        "description": "Use this tool when you don't need to do anything, you only need to respond to the user's question or ask for additional information.",
        "parameters": {
            "type": "object",
            "properties": {},
            "additionalProperties": False,
        },
        "strict": True,
    }
}


add_favourites = {
    "type": "function",
    "function": {
        "name": "add_favourites",
        "description": "Use this tool when the user wants to add a product/option/item to their favorites.",
        "parameters": {
            "type": "object",  # Root type must be an object
            "properties": {
                "product_ids": {  # Use a property to define the array
                    "type": "array",
                    "items": {
                        "type": "string",
                        "description": "The ID of the product to add to favorites."
                    }
                }
            },
            "required": ["product_ids"],  # Specify required fields if needed
            "additionalProperties": False
        },
        "strict": True,
    }
}


open_favourites = {
    "type": "function",
    "function": {
        "name": "open_favorites",
        "description": "Use this tool when the user wants to open their favorites/options.",
        "parameters": {
            "type": "object",
            "properties": {},
            "additionalProperties": False,
        },
        "strict": True,
        "additionalProperties": False,
    }
}

remove_favourites = {
    "type": "function",
    "function": {
        "name": "remove_favourite",
        "description": "Use this tool when the user wants to remove a product from their favorites/wishlist.",
        "parameters": {
            "type": "object",
            "properties": {
                "product_ids": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "description": "The ID of the product to remove from favorites."
                    }
                }
            },
            "required": ["product_ids"],
            "additionalProperties": False,
        },
        "strict": True,
        "additionalProperties": False,
    }
}

view_product_details = {
    "type": "function",
    "function": {
        "name": "view_product_details",
        "description": "Use this tool when the user wants to view details of a product/option/item.",
        "parameters": {
            "type": "object",
            "properties": {
                "product_id": {
                    "type": "string",
                    "description": "The ID of the product to view."
                }
            },
            "required": ["product_id"],
            "additionalProperties": False
        },
        "strict": True,
        "additionalProperties": False,
    }
}

exit_product_details = {
    "type": "function",
    "function": {
        "name": "exit_product_details",
        "description": "Use this tool when the user wants to close the product details window.",
        "parameters": {
            "type": "object",
            "properties": {},
            "additionalProperties": False,
        },
        "strict": True,
        "additionalProperties": False,
    }
}

close_favorites = {
    "type": "function",
    "function": {
        "name": "close_favorites",
        "description": "Use this tool when the user wants you to close the favorites window/wishlist.",
        "parameters": {
            "type": "object",
            "properties": {},
            "additionalProperties": False,
        },
        "strict": True,
        "additionalProperties": False,
    }
}

go_to_cart = {
    "type": "function",
    "function": {
        "name": "go_to_cart",
        "description": "Use this tool when the user wants to go to their shopping cart. Also when the user wants to end the conversation.",
        "parameters": {
            "type": "object",
            "properties": {},
            "additionalProperties": False,
        },
        "strict": True,
        "additionalProperties": False,
    }
}

# to trzeba przerbić pod usuwanie produktów, podmianą, show more, show less
show_products = {
    "type": "function",
    "function": {
        "name": "show_products",
        "description": "Use this tool when the user wants to show products/options/items. Use also when the user wants to replace some products (then rewrite the unchanged products, replace only the changed products with new ones). Use also when user wants to go to the next page of products (then all products should be the new ones). Use also when you whant to go from 'more products view' to 'products view' (then the most matching products should be keeped).",
        "parameters": {
          "type": "object",
          "properties": {
            "product_ids": {
              "type": "array",
              "items": {
                "type": "string",
              "description": "The ID of the product/option/item to show (old product id when this position is unchanged, new product id when this position is changed)"
            },
            "minItems": 4,
            "maxItems": 4
          }
        },  
        "strict": True,
        "additionalProperties": False,
      }
    }
}

show_more_products = {
    "type": "function",
    "function": {
        "name": "show_more_products",
        "description": "Use this tool when the user wants to show more products/options/items than the previous 4. Use also when the user wants to replace some products in the 'more products view' (then rewrite the unchanged products, replace only the changed products with new ones). Use also when user wants to go to the next page of more products (then all products should be the new ones).",
        "parameters": {
          "type": "object",
          "properties": {
            "product_ids": {
              "type": "array",
              "items": {
                "type": "string",
              "description": "The ID of the product to show (old product id when this position is unchanged, new product id when this position is changed)"
            },
            "minItems": 8,
            "maxItems": 8
          }
        },  
        "strict": True,
        "additionalProperties": False,
      }
    }
}

tools = [
    do_nothing,
    add_favourites,
    open_favourites,
    remove_favourites,
    view_product_details,
    go_to_cart,
    show_products,
    close_favorites,
    exit_product_details,
    show_more_products
]