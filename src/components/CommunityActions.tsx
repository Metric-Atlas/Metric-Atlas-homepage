import { ContactForm } from "./actions/ContactForm";
import { IssueButton } from "./actions/IssueButton";
import { PrButton } from "./actions/PrButton";
import { ShareButton } from "./actions/ShareButton";
import { SponsorButton } from "./actions/SponsorButton";
import { StarButton } from "./actions/StarButton";

export function CommunityActions() {
  return (
    <section id="community" className="community">
      <div className="container">
        <h2>커뮤니티</h2>
        <p>
          Metric Atlas는 오픈소스입니다. 코드를 보내주시거나, 버그를
          알려주시거나, 커피 한 잔으로 응원해주세요.
        </p>
        <div className="action-grid">
          <PrButton />
          <IssueButton />
          <StarButton />
          <SponsorButton />
          <ShareButton />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
