from pydantic import BaseModel, Field
from typing_extensions import List, Union


class QuerySummary(BaseModel):
    search_query: str = Field(description="Here extract from the whole conversation the general name of the item the user is interested in (for example 'Winter jacket', 'Running shoes', etc.)")
    product_features: List[Union[str, str]] = Field(description="Here extract from the whole conversation the features of the products that the user is interested in - both names and values. For example 'color': 'red', 'size': 'XL', 'price': '$12-30', etc. The first value of each element is the name of the feature, the second value is the value of the feature. Put only the most important features that the user mentioned, maximum 5 features.")
