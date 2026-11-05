export default function Intro() {
  return (
    <section className="intro">
      <p className="intro-lead">
        Hi! Welcome to West Shore Slices! This site was created by Carrik and Hope. We have lived close to Messiah University for a few years now, and recently realized just how many local pizza shops
        there are around us. It seems like everywhere we go, there's another one. And every time, we say, "We should try that place some time." Yet, we still only ever really went to one or two places. One morning in bed, we finally decided that it's time to just take a look and see how many options there are. Surely we're missing out on some great options out of laziness and habit more than anything.
      </p>
      <br />
      <p className="intro-lead">
        It turns out, there are OVER 30 places within about a 20 minute drive of us! We've got a loooot of pizza to eat, folks.
      </p>
      <br />
      <p className="intro-lead">
        We chose this range because we wanted enough options to make this a fun long-term project, but also because with the amount of options in that range, going more than about 20 minutes away feels silly.
        Pizza is pizza, after all, and it's unlikely that a place on the east shore is going to be meaningfully better enough than somewhere closer to justify the extra drive. 20 minutes felt like a nice balance between
        options and convenience. Our range includes everything up to I-81 (Mechanicsburg, Camp Hill, and Enola), over to Carlisle, and south to Dillsburg and over to the Susquehanna around Lewisberry.
      </p>
      <br />
      <p className="intro-lead">
        People value different things. Some people don't want to go somewhere that looks a little seedy, even for great food. Some people are more price-sensitive, and will only go to restaurants that offer a lot of bang for your buck.
        To get a comprehensive ranking, we decided to score each restaurant on three categories: Taste, Price, and Vibe. Each category is scored from 1 to 10, and the average of those three scores is the Slice Score.
        The Slice Score is what determines the rankings on this site. This way we get to represent factors like, "This place is really good, but also expensive," or the classic Chinese restaurant stereotype of 
        "the food is great, but the place is a little sketchy." Every review is based on our own real experience at each restaurant, and we're only reviewing each place once. That means flukes can happen. 
        Sometimes, waitstaff is having a bad day or the pizza isn't as good as it usually is. It also works the other way. Sometimes, we'll get lucky with a pizza that's better than normal for that place.
      </p>
      <br />
      <p className="intro-lead">
        We're excited to have you along! Get out the red plastic cup, grab the garlic salt and oregano, and let's get started!
      </p>

      <div className="intro-details">
        <details>
          <summary>The Rules</summary>
          <ul>
            <li>No major chains. You won’t find Pizza Hut or Papa Johns on this list.</li>
            <li>Different locations with the same name are sampled as if they were independently owned stores.</li>
            <li>Restaurants must be within about a 20 minute drive of Messiah.</li>
            <li>
              We always get a pizza, and it’s usually pepperoni, but to keep things from getting stale we’re allowed
              to try something different at each location.
            </li>
            <li>Appetizers and desserts are fair game, but optional. Sometimes we get them, sometimes we don’t.</li>
          </ul>
        </details>

        <details>
          <summary>How We Score</summary>
          <p>Taste, Price, and Vibe are each a whole number from 1 to 10, with no half-grades.</p>
          <dl>
            <dt>Taste: How good is the pizza?</dt>
            <dd>
              Everything about the pie counts, including crust style, sauce, and greasiness. Taste takes a hit when a
              restaurant makes choices we find atypical or peculiar, like shredded ham instead of chunks or slices.
              We’ll cover the rest of the food in the full review, but this number is about the pizza itself.
            </dd>
            <dt>Price: How good of a deal is the food here?</dt>
            <dd>
              Unlike Taste, every item we order is factored in, so great garlic knots will push the score up. For
              reference, a large one-topping pie around here averages roughly $21–22, and a specialty pie like a
              meat-lovers or supreme runs roughly $24–28.50. A pie a few dollars below those averages raises the
              score. A $26 pepperoni pizza or wings at $2+ apiece lowers it. A higher score always means a better
              deal.
            </dd>
            <dt>Vibe: How do we feel about the idea of eating at the restaurant?</dt>
            <dd>
              Friendliness of the staff, how the place is decorated, whether it’s loud or quiet, and everything else
              you’d weigh when deciding whether to eat in, or only order to-go, if at all.
            </dd>
            <dt>Slice Score: What’s the final verdict?</dt>
            <dd>
              The average of Taste, Price, and Vibe, with each counting equally. It’s rounded to one decimal, so it’s
              the one score that can land between whole numbers, like a 7.7. The rankings are sorted by Slice Score,
              highest first.
            </dd>
          </dl>
        </details>
      </div>
    </section>
  )
}
