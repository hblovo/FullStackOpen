import { render, screen } from '@testing-library/react'
import BlogForm from '../BlogForm'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn() // 模拟提交函数
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Testing React Forms')
  await user.type(authorInput, 'FullStack Tester')
  await user.type(urlInput, 'http://testurl.com')
  await user.click(sendButton)

  //verify function called once
  expect(createBlog.mock.calls).toHaveLength(1)

  //verify submitted data
  const submittedData = createBlog.mock.calls[0][0]
  expect(submittedData.title).toBe('Testing React Forms')
  expect(submittedData.author).toBe('FullStack Tester')
  expect(submittedData.url).toBe('http://testurl.com')
})