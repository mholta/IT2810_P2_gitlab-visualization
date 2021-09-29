# Visualisering av GitLab repo

Dette prosjektet inneholder en singlepage-applikasjon for visning av data hentet fra GitLab sitt Rest-API. Det er utviklet i React med TypeScript, i henhold til arbeidskravet.

## Beskrivelse av applikasjonen

Applikasjonen begynner med å spørre brukeren om å legge inn en prosjekt-ID og Access Token fra et GitLab-prosjekt. Man får også muligheten til å huske prosjektet mellom sessions, og bestemme om brukerne skal være anonymiserte. Skriver man inn gyldig informasjon vil man få opp applikasjonens hovedside. Her vises det frem en liste med commits eller issues. Man kan også bestemme å se en kolonne for hver brukers bidrag. Trykker man på filter-knappen oppe i venstre hjørne vil det åpnes en meny. Her kan man velge om man vil se commits eller issues, filtrere på dato og velge hvilke brukere sine bidrag en vil at skal vises. Til slutt kan man også velge om man vil vise dataen som en liste eller en graf. Velger man grafen vil man få opp et linjediagram for commits som viser hver brukers kumulative bidrag, mens issues blir representert som et stolpediagram. Har man lyst å hente informasjon fra et annet prosjekt kan man logge ut ved å trykke på knappen øverst til høyre.

### Valg av funksjonalitet

Helo

## Arkitektur og valg

Gruppens ønsker var å ha en fornuftig arkitektur og mappestruktur, både fordi vi ønsker god veldikeholdbarhet og for å gjøre det mer oversiktelig under utvikling. Vi valgte å dele opp prosjektet i flere mindre deler. For eksempel ønsket vi en egen mappe for de to context-instasene våre. I tillegg lagde vi en egen mappe for "sidene" i applikasjonen, som i dette tilfellet er hovedsiden og en innloggingsside. I komponentmappen lagde vi flere undermapper for å gjøre det enklere å navigere. Under ser du de viktigste mapppene i arkitekturen vår.

```
src
├───__snapshots__
├───api
├───components
│   ├───dataViews
│   └───filter
├───context
├───pages
│   │   login.tsx
│   │   mainPage.tsx
├───styles
│   │   theme.tsx
└───utils
```

## Tekniske valg

Under diskuteres noen av de viktigste tekniske valgene som er gjort i prosjektet.

### RestAPI

Vi valgte å bruke Fetch API-et for å hente data fra GitLab da det er en del av JavaScript. Dataen blir hentet ved oppstart, hver gang man endrer på filtreringsdatoene, eller bytter mellom commits og issues. Dette skjer ved hjelp av useEffect-hooken. Ettersom det kan være svært mange commits eller issues i et prosjekt, og det er en begrensning i GitLab sitt API til hvor mange man kan hente om gangen, henter vi dataene rekursivt til det ikke er mer ny data å hente.

### Styling av UI

For styling av UI valgte vi å bruke [Material UI](https://mui.com/) som base sammen med [styled-components](https://styled-components.com/) for custom styling og overskriving av styles. Styled-components gir muligheten til å skrive vanlig CSS og bruke avanserte CSS-selektorer i komponentene. I tillegg kan man sende inn props for betinget styling.

I tillegg har vi tatt i bruk [Framer motion](https://www.framer.com/motion/) for animering av elementer. Vi valgte å bruke dette da det er enkelt å lager mer komplekse animasjoner uten å måtte skrive mye CSS. I tillegg er det JavaScript-basert, noe som gjør at man har mer kontroll.

### Visning av data

Vi valgte å bruke [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2) for å vise graf og stolpediagram fordi dette gir enkel implementasjon.

### Innlogging

I sammenheng med at vi implementerte innlogging valgte vi å også implementere [react-router-dom](https://www.npmjs.com/package/react-router-dom) for å kunne sende brukeren til en egen innloggingsside og ikke som en popup.

### Session- og local storage

Dato-filter lagres i session-storage, mens kategori lagres i local storage. Dette kun for å vise bruk av begge metodene for lokal lagring.

Innloggingsinformasjon lagres i local storage dersom brukeren huker av for "husk meg". Denne informasjonen fjernes fra local storage når brukeren logger ut.

### Testing

- [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)
- [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event/)

Jest: mainContentContainer.test.tsx

Testing av brukergrensesnitt:
Mobil (vertikal og horisontal), PC med stor skjerm, Laptop(?)
