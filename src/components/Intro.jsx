export default function Intro() {
  return (
    <section className="intro">
      <p className="intro-lead">
        Two people, one mission: find the best pizza within 20 minutes of Messiah University. We’re working our way
        through the area’s independent pizzerias, from corner slice shops to sit-down favorites, and scoring each one
        on Taste, Price and Vibe. The three scores are averaged into an overall grade, and the rankings below update
        with every new stop. There are a lot of pizza places around here and we’ll probably miss a few, but every
        score comes from a real visit. Browse the list, open a card for the full story, and tell us where to eat next.
      </p>

      <div className="intro-details">
        <details>
          <summary>The rules</summary>
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
          <summary>How we score</summary>
          <p>Every score is a whole number from 1 to 10. The overall grade is the average of the three.</p>
          <dl>
            <dt>Taste: How good is the pizza?</dt>
            <dd>
              Everything about the pie counts, including crust style, sauce and greasiness. Taste takes a hit when a
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
          </dl>
        </details>
      </div>
    </section>
  )
}
