import { MarkSchema } from './schemas'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import { drizzle } from 'drizzle-orm/bun-sqlite'
import { MarksTable } from './db/tables'
import { eq } from 'drizzle-orm'

const db = drizzle('app.db')
const marks = new Hono()

marks.get('/list', async (c) => {
  const marks = await db.select().from(MarksTable)
  return c.json({ marks: marks, count: marks.length })
})

marks.post('', zValidator('json', MarkSchema), async (c) => {
  const body = c.req.valid('json')
  await db.insert(MarksTable).values(body)
  return c.json({ message: 'Mark received!', data: body })
})

marks.put('/:id', zValidator('json', MarkSchema), async (c) => {
  const { id } = c.req.param()
  const body = c.req.valid('json')
  await db
    .update(MarksTable)
    .set(body)
    .where(eq(MarksTable.id, parseInt(id)))
  return c.json({ message: 'Mark updated successfully' })
})

marks.delete('/:id', async (c) => {
  const { id } = c.req.param()
  await db.delete(MarksTable).where(eq(MarksTable.id, parseInt(id)))
  return c.json({ message: 'Mark deleted successfully' })
})

const app = new Hono()
app.route('/mark', marks)

export default app
