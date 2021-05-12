# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products Example: A SHOW route: 'blogs/:id' [GET]

- Index '/products' [GET]
- Show '/products/:id' [GET]
- Create [token required] '/products' [POST]

#### Users

- Index [token required] '/users' [GET]
- Show [token required] '/users/:id' [GET]
- Create N[token required] '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] '/orders/:user_id' [GET]

## Data Shapes

#### Product

- id
- name
- price
- category

Column | Type | Modifiers  
  
----------+------------------------+----------------------------------
id | integer | not null default
name | character varying(255) | not null
price | integer | not null
category | character varying(50) | not null
Indexes:
"products_pkey" PRIMARY KEY, btree (id)

#### User

- id
- firstName
- lastName
- password

Column | Type | Modifiers  
  
-----------+------------------------+---------------------------------
id | integer | not null default
firstname | character varying(255) | not null
lastname | character varying(255) | not null
password | character varying | not null
Indexes:
"users_pkey" PRIMARY KEY, btree (id)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Column | Type | Modifiers  
  
---------+-----------------------+------------------------------------
id | integer | not null default
status | character varying(15) | not null
user_id | integer | not null
Indexes:
"orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

additionally an order_products table will be created with the following data shape

### Orders_Products

- id
- quantity of each product in the order
- product_id of the products been added to the order
- order_id the id of the order in which products are been added

  Column | Type | Modifiers  


------------+---------+-----------------------------------------------
id | integer | not null default
quantity | integer | not null
product_id | integer | not null
order_id | integer | not null
Indexes:
"order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
