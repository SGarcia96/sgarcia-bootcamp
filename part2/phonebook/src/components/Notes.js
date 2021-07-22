export const Note = ({ id, content, date }) => {
  
    return (
      <li>
        <p>{id}</p>
        <p><strong>{content}</strong></p>
        <p><small>{date}</small></p>
      </li>
    )
}

export default Note;