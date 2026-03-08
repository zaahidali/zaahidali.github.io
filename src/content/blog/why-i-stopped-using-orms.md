# Why I Stopped Using ORMs (And What I Use Instead)

Object-Relational Mappers promise to make database interactions painless. After years of using them in production, I've found they often create more problems than they solve.

## The Honeymoon Phase

When you first start with an ORM like ActiveRecord or SQLAlchemy, everything feels magical:

```ruby
# Look, no SQL!
users = User.where(active: true)
              .includes(:posts)
              .order(created_at: :desc)
              .limit(10)
```

Simple queries are trivial. Associations load automatically. Migrations handle schema changes. Life is good.

## Where It Falls Apart

### The N+1 Problem

This is the classic footgun. You write innocent-looking code:

```ruby
posts = Post.all
posts.each do |post|
  puts post.author.name  # Each iteration = 1 query
end
```

That's `N+1` queries — one to fetch all posts, then one per post to fetch the author. In production with thousands of posts, your database melts.

### Complex Queries Become Unreadable

The moment you need a `JOIN` with conditions, subqueries, or window functions, the ORM abstraction leaks:

```python
# SQLAlchemy trying to do a window function
from sqlalchemy import func, over

query = session.query(
    Sale.product_id,
    Sale.amount,
    func.rank().over(
        partition_by=Sale.product_id,
        order_by=Sale.amount.desc()
    ).label('rank')
)
```

Compare that to the SQL:

```sql
SELECT product_id, amount,
       RANK() OVER (PARTITION BY product_id ORDER BY amount DESC) as rank
FROM sales;
```

The SQL is clearer, shorter, and easier to debug.

## What I Use Instead

I've settled on a middle ground: **query builders** combined with raw SQL for complex operations.

For simple CRUD, a lightweight query builder like **Knex.js** or **Kysely** gives you type safety without the abstraction overhead:

```typescript
const users = await db
  .selectFrom('users')
  .where('active', '=', true)
  .orderBy('created_at', 'desc')
  .limit(10)
  .execute();
```

For complex queries, I write raw SQL and use parameterized queries:

```typescript
const result = await db.execute(sql`
  SELECT p.*, u.name as author_name
  FROM posts p
  JOIN users u ON u.id = p.author_id
  WHERE p.published = true
  ORDER BY p.created_at DESC
`);
```

## The Takeaway

ORMs aren't inherently bad — they're just the wrong tool for many jobs. Know your SQL, use query builders for simple operations, and don't be afraid to write raw queries when the abstraction fights you.

> "The best code is the code you understand completely." — Every senior engineer, eventually.
