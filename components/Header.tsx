interface Props {
  title: string;
  links: { id: number; name: string; content: string }[];
}

export default function Header(props: Props) {
  return (
    <header>
      <h1>{props.title}</h1>
      <nav>
        <ul>
          {props.links?.map((link) => (
            <li key={link.id}>
              <a href={link.content}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
