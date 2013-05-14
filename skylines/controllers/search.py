from tg import expose
from tg.decorators import without_trailing_slash

from .base import BaseController
from skylines.model import User, Club, Airport, Competition
from skylines.model.search import (
    combined_search_query, text_to_tokens, escape_tokens
)

MODELS = [User, Club, Airport, Competition]


class SearchController(BaseController):
    @without_trailing_slash
    @expose('search/list.jinja')
    def index(self, **kw):
        search_text = kw.get('text')
        if not search_text:
            return dict()

        # Split the search text into tokens and escape them properly
        tokens = text_to_tokens(search_text)
        tokens = escape_tokens(tokens)

        # Create combined search query
        query = combined_search_query(MODELS, tokens)

        # Perform query and limit output to 20 items
        results = query.limit(20).all()

        return dict(search_text=search_text, results=results)