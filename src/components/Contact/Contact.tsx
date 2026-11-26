import Icon from '../Icon';

export interface ContactProps {
  title: string;
  body: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

const Contact = ({ title, body, email, linkedinUrl, githubUrl }: ContactProps) => (
  <section id="contact" className="contact" aria-labelledby="contact-heading">
    <div className="wrap">
      <h2 id="contact-heading">{title}</h2>
      <p>{body}</p>
      <div className="contact__actions">
        <a className="button button--amber" href={`mailto:${email}`} data-testid="contact-email">
          <Icon name="mail" />
          {email}
        </a>
        <a
          className="button button--ghost"
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="linkedin" />
          LinkedIn
        </a>
        <a
          className="button button--ghost"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="github" />
          GitHub
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
