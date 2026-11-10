import { FormEvent, useEffect, useMemo, useState } from "react";
import { loadState, saveState } from "./storage";
import type { Guest, PlannerState, View } from "./types";

const schedule = [
  { time: "3:30 pm", title: "Guests arrive", detail: "Garden drinks and a first look at the lake." },
  { time: "4:00 pm", title: "Ceremony", detail: "Vows under the olive trees, with a string quartet." },
  { time: "5:00 pm", title: "Golden hour", detail: "Portraits, toasts, and the long table being set." },
  { time: "7:00 pm", title: "Dinner", detail: "Four courses, family-style, under paper lanterns." },
  { time: "9:30 pm", title: "Dancing", detail: "The courtyard opens. Stay as late as the night allows." },
];

function formatLongDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function useCountdown(date: string, time: string) {
  const target = useMemo(() => new Date(`${date}T${time}:00`), [date, time]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function App() {
  const [view, setView] = useState<View>("invitation");
  const [state, setState] = useState<PlannerState>(loadState);
  const [guestName, setGuestName] = useState("");
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const { details } = state;
  const count = useCountdown(details.date, details.time);
  const initials = `${details.partnerOne[0] ?? ""}${details.partnerTwo[0] ?? ""}`.toUpperCase();
  const planned = state.budget.reduce((sum, item) => sum + item.planned, 0);
  const spent = state.budget.reduce((sum, item) => sum + item.spent, 0);
  const coming = state.guests.filter((g) => g.status === "yes").reduce((n, g) => n + g.party, 0);
  const invited = state.guests.reduce((n, g) => n + g.party, 0);
  const done = state.tasks.filter((t) => t.done).length;

  function go(next: View, hash?: string) {
    setView(next);
    window.setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 20);
  }

  function onRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState((prev) => ({
      ...prev,
      rsvps: [
        {
          name: String(form.get("name") ?? ""),
          attending: form.get("attending") === "no" ? "no" : "yes",
          guests: Number(form.get("guests") ?? 1),
          note: String(form.get("note") ?? ""),
          createdAt: new Date().toISOString(),
        },
        ...prev.rsvps,
      ],
    }));
    setRsvpSent(true);
    event.currentTarget.reset();
  }

  function addGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;
    const guest: Guest = {
      id: crypto.randomUUID(),
      name,
      party: Number(form.get("party") ?? 1),
      status: "invited",
      side: "shared",
    };
    setState((prev) => ({ ...prev, guests: [...prev.guests, guest] }));
    event.currentTarget.reset();
    setGuestName("");
  }

  const groups = [...new Set(state.tasks.map((task) => task.group))];

  return (
    <div className="site">
      <header className="nav">
        <div className="brand">
          Wedding of
          <span>
            {details.partnerOne} & {details.partnerTwo}
          </span>
        </div>
        <nav className="nav-links">
          <button className={view === "invitation" ? "active" : ""} onClick={() => go("invitation")}>
            Invitation
          </button>
          <a href="#day" onClick={() => go("invitation", "#day")}>
            The day
          </a>
          <a href="#place" onClick={() => go("invitation", "#place")}>
            Place
          </a>
          <a href="#rsvp" onClick={() => go("invitation", "#rsvp")}>
            RSVP
          </a>
          <button className={`nav-cta ${view === "planner" ? "active" : ""}`} onClick={() => go("planner")}>
            Plan
          </button>
        </nav>
      </header>

      {view === "invitation" ? (
        <>
          <section className="hero">
            <div className="invite">
              <p className="kicker">Together with their families</p>
              <div className="monogram" aria-hidden="true">
                <span>{initials}</span>
              </div>
              <h1 className="names">
                {details.partnerOne}
                <span className="amp">&</span>
                {details.partnerTwo}
              </h1>
              <p className="meta">
                {formatLongDate(details.date)} · {details.time}
                <br />
                {details.venue}, {details.city}
              </p>
              <div className="countdown" aria-label="Countdown to the wedding">
                <div className="count">
                  <strong>{count.days}</strong>
                  <span>Days</span>
                </div>
                <div className="count">
                  <strong>{count.hours}</strong>
                  <span>Hours</span>
                </div>
                <div className="count">
                  <strong>{count.minutes}</strong>
                  <span>Minutes</span>
                </div>
                <div className="count">
                  <strong>{count.seconds}</strong>
                  <span>Seconds</span>
                </div>
              </div>
              <div className="hero-actions">
                <a className="btn" href="#rsvp" onClick={() => go("invitation", "#rsvp")}>
                  RSVP
                </a>
                <button className="btn ghost" onClick={() => go("planner")}>
                  Open planner
                </button>
              </div>
            </div>
          </section>

          <section className="section" id="story">
            <div className="section-head">
              <p className="kicker">Our story</p>
              <h2>A quiet beginning, a long table at the end.</h2>
              <p>
                Happiness is the working name for this day — a planner and a guest page in one, so the
                people you love know where to stand, and you still know what is left to do.
              </p>
            </div>
            <div className="story-grid">
              <article className="card">
                <h3>The meeting</h3>
                <p>A borrowed kitchen, too much coffee, and a conversation that did not want to end.</p>
              </article>
              <article className="card">
                <h3>The yes</h3>
                <p>A walk at dusk, a ring that had been waiting, and the easiest answer of their lives.</p>
              </article>
              <article className="card">
                <h3>The day</h3>
                <p>Olive trees, candlelight, and everyone who made the years in between feel like home.</p>
              </article>
            </div>
          </section>

          <section className="section alt" id="day">
            <div className="section-head">
              <p className="kicker">Order of the day</p>
              <h2>How the evening unfolds.</h2>
            </div>
            <div className="timeline">
              {schedule.map((item) => (
                <article className="event" key={item.time}>
                  <time>{item.time}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="place">
            <div className="section-head">
              <p className="kicker">Place & stay</p>
              <h2>Come early. Stay late.</h2>
            </div>
            <div className="place-grid">
              <div className="map-block">
                <div>
                  <strong>{details.venue}</strong>
                  <div>{details.city}</div>
                </div>
              </div>
              <article className="card">
                <h3>Dress code</h3>
                <p>{details.dressCode}. Linen, silk, and shoes that can find the grass.</p>
                <h3>Travel</h3>
                <p>
                  Trains run to the lake through the afternoon. A shuttle leaves the village square at
                  3:00 pm for anyone staying in town.
                </p>
                <h3>Gifts</h3>
                <p>Your presence is the gift. If you insist, a contribution to the honeymoon fund is welcome.</p>
              </article>
            </div>
          </section>

          <section className="section alt" id="rsvp">
            <div className="section-head">
              <p className="kicker">RSVP</p>
              <h2>Will you be there?</h2>
            </div>
            <div className="rsvp-wrap">
              {rsvpSent ? (
                <div className="thanks">
                  <h3>We have you.</h3>
                  <p className="muted">
                    Thank you. The couple will see this reply in the planner. Change names, date, and
                    venue anytime from the Plan tab.
                  </p>
                </div>
              ) : (
                <form onSubmit={onRsvp}>
                  <label>
                    Full name
                    <input name="name" required placeholder="Your name" />
                  </label>
                  <label>
                    Can you come?
                    <select name="attending" defaultValue="yes">
                      <option value="yes">Joyfully yes</option>
                      <option value="no">With regret, no</option>
                    </select>
                  </label>
                  <label>
                    Number in your party
                    <input name="guests" type="number" min={1} max={8} defaultValue={1} />
                  </label>
                  <label>
                    Note for the couple
                    <textarea name="note" placeholder="Songs, allergies, a story they should hear…" />
                  </label>
                  <button className="btn" type="submit">
                    Send reply
                  </button>
                </form>
              )}
              <article className="card">
                <h3>Kindly reply by</h3>
                <p>1 May 2027. After that we lock the tables with the kitchen.</p>
                <p className="muted">
                  This first version stores replies on this device so you can try the whole flow before
                  connecting a real guest list.
                </p>
              </article>
            </div>
          </section>
        </>
      ) : (
        <section className="planner">
          <div className="planner-intro">
            <div>
              <p className="kicker">Private planner</p>
              <h2>Make the day feel light.</h2>
            </div>
            <button className="btn ghost" onClick={() => go("invitation")}>
              Back to invitation
            </button>
          </div>

          <div className="stats">
            <div className="stat">
              <span>Tasks</span>
              <strong>
                {done}/{state.tasks.length}
              </strong>
            </div>
            <div className="stat">
              <span>Budget used</span>
              <strong>{planned ? Math.round((spent / planned) * 100) : 0}%</strong>
            </div>
            <div className="stat">
              <span>Coming</span>
              <strong>{coming}</strong>
            </div>
            <div className="stat">
              <span>Invited</span>
              <strong>{invited}</strong>
            </div>
          </div>

          <div className="planner-grid">
            <article className="panel">
              <h2>The couple</h2>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  setState((prev) => ({
                    ...prev,
                    details: {
                      partnerOne: String(form.get("partnerOne")),
                      partnerTwo: String(form.get("partnerTwo")),
                      date: String(form.get("date")),
                      time: String(form.get("time")),
                      venue: String(form.get("venue")),
                      city: String(form.get("city")),
                      dressCode: String(form.get("dressCode")),
                    },
                  }));
                }}
              >
                <label>
                  Partner one
                  <input name="partnerOne" defaultValue={details.partnerOne} />
                </label>
                <label>
                  Partner two
                  <input name="partnerTwo" defaultValue={details.partnerTwo} />
                </label>
                <label>
                  Date
                  <input name="date" type="date" defaultValue={details.date} />
                </label>
                <label>
                  Time
                  <input name="time" type="time" defaultValue={details.time} />
                </label>
                <label>
                  Venue
                  <input name="venue" defaultValue={details.venue} />
                </label>
                <label>
                  City
                  <input name="city" defaultValue={details.city} />
                </label>
                <label>
                  Dress code
                  <input name="dressCode" defaultValue={details.dressCode} />
                </label>
                <button className="btn" type="submit">
                  Save details
                </button>
              </form>
            </article>

            <article className="panel">
              <h2>Checklist</h2>
              {groups.map((group) => (
                <div className="task-group" key={group}>
                  <h4>{group}</h4>
                  {state.tasks
                    .filter((task) => task.group === group)
                    .map((task) => (
                      <label className={`task ${task.done ? "done" : ""}`} key={task.id}>
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() =>
                            setState((prev) => ({
                              ...prev,
                              tasks: prev.tasks.map((item) =>
                                item.id === task.id ? { ...item, done: !item.done } : item,
                              ),
                            }))
                          }
                        />
                        <span>{task.title}</span>
                      </label>
                    ))}
                </div>
              ))}
            </article>

            <article className="panel">
              <h2>Budget</h2>
              {state.budget.map((item) => (
                <div className="row" key={item.id}>
                  <span>{item.name}</span>
                  <span>
                    {money(item.spent)} / {money(item.planned)}
                  </span>
                </div>
              ))}
              <div className="bar" aria-hidden="true">
                <i style={{ width: `${planned ? Math.min(100, (spent / planned) * 100) : 0}%` }} />
              </div>
              <p className="muted">
                {money(spent)} spent of {money(planned)} planned.
              </p>
            </article>

            <article className="panel">
              <h2>Guests</h2>
              <div className="guest-list">
                {state.guests.map((guest) => (
                  <div className="guest" key={guest.id}>
                    <div>
                      <strong>{guest.name}</strong>
                      <div className="muted">
                        {guest.party} {guest.party === 1 ? "guest" : "guests"}
                      </div>
                    </div>
                    <span className="pill">{guest.status}</span>
                    <select
                      value={guest.status}
                      onChange={(event) =>
                        setState((prev) => ({
                          ...prev,
                          guests: prev.guests.map((item) =>
                            item.id === guest.id
                              ? { ...item, status: event.target.value as Guest["status"] }
                              : item,
                          ),
                        }))
                      }
                    >
                      <option value="invited">invited</option>
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                      <option value="maybe">maybe</option>
                    </select>
                  </div>
                ))}
              </div>
              <form className="add-row" onSubmit={addGuest}>
                <input
                  name="name"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="Add a guest"
                />
                <input name="party" type="number" min={1} max={10} defaultValue={1} />
                <button className="btn" type="submit">
                  Add
                </button>
              </form>
              {state.rsvps.length > 0 && (
                <>
                  <h3>Latest RSVPs</h3>
                  {state.rsvps.slice(0, 5).map((rsvp) => (
                    <div className="row" key={rsvp.createdAt + rsvp.name}>
                      <span>
                        {rsvp.name} · {rsvp.attending}
                      </span>
                      <span>{rsvp.guests}</span>
                    </div>
                  ))}
                </>
              )}
            </article>
          </div>
        </section>
      )}

      <footer className="footer">
        <span>Happiness — a wedding planner</span>
        <span>
          {details.partnerOne} & {details.partnerTwo}
        </span>
      </footer>
    </div>
  );
}
