<script lang="ts">
  import { t } from "$lib/scripts/i18n";
  let Webname = "Arth Panel";
</script>

<footer
  class="footer p-10 bg-neutral bg-opacity-50 backdrop-blur text-base-content"
>
  <div>
    <img src="/images/arthlogo-footer.svg" width="150px" />
    <p>Arth Technologies<br />© 2022-{new Date().getFullYear()}</p>
  </div>
  <div>
    <span class="footer-title">{$t("footer.resources")}</span>
    <a class="link link-hover" href="https://codeberg.org/arth/" target="_blank"
      >{$t("footer.codeberg")}</a
    >
    <a class="link link-hover" href="/articles" target="_blank"
      >{$t("footer.blog")}</a
    >
    <a class="link link-hover" href="/software" target="_blank"
      >{$t("footer.docs")}</a
    >
  </div>
  <div>
    <span class="footer-title">{$t("footer.about")}</span>
    <a class="link link-hover" href="/hosting" target="_blank"
      >{$t("footer.hosting")}</a
    >
    <a class="link link-hover" href="/terms-of-service" target="_blank"
      >{$t("footer.tos")}</a
    >
    <a class="link link-hover" href="/privacy" target="_blank"
      >{$t("footer.privacy")}</a
    >
  </div>
  <div>
    <span class="footer-title">{$t("footer.socials")}</span>
    <a class="link link-hover" href="https://x.com/arthhosting" target="_blank"
      >X (Twitter)</a
    >

    <a
      class="link link-hover"
      href="https://www.youtube.com/@arthmc"
      target="_blank">{$t("footer.youtube")}</a
    >

    <a
      class="link link-hover"
      href="https://discord.com/invite/jUeNm7UvKy"
      target="_blank">{$t("footer.discord")}</a
    >
  </div>
</footer>
