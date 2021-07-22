export const Note = ({ id, title, body }) => {
  
    return (
      <li>
        <p>{id}</p>
        <p><strong>{title}</strong></p>
        <p><small>{body}</small></p>
      </li>
    )
}

export default Note;