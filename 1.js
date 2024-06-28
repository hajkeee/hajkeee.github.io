function main() {
  const campaignsIterator = AdsApp.campaigns()
    .withCondition("Status = 'ENABLED'")
    .withCondition("AdvertisingChannelType = 'UNIVERSAL_APP'")
    .get();

  while (campaignsIterator.hasNext()) {
    const campaign = campaignsIterator.next();
    const adGroupsIterator = campaign.adGroups()
      .withCondition("Status = 'ENABLED'")
      .get();

    while (adGroupsIterator.hasNext()) {
      const adGroup = adGroupsIterator.next();
      const adGroupId = adGroup.getId();
      const adGroupName = adGroup.getName();

      const stats = adGroup.getStatsFor("LAST_48_HOURS");

      if (stats.getImpressions() === 0) {
        // Copy and create the new ad group
        const newAdGroupBuilder = campaign.newAdGroupBuilder()
          .withName(adGroupName + " - Copy")
          .withStatus("ENABLED")
          .withAdGroupType("UNIVERSAL_APP_ADS");

        const newAdGroup = newAdGroupBuilder.build().getResult();

        // Copy settings
        newAdGroup.bidding().setCpc(adGroup.bidding().getCpc());

        // Copy keywords if applicable
        const keywordsIterator = adGroup.keywords().get();
        while (keywordsIterator.hasNext()) {
          const keyword = keywordsIterator.next();
          newAdGroup.newKeywordBuilder()
            .withText(keyword.getText())
            .withCpc(keyword.bidding().getCpc())
            .build();
        }

        // Copy ads
        const adsIterator = adGroup.ads().get();
        while (adsIterator.hasNext()) {
          const ad = adsIterator.next();
          const adType = ad.getType();
          const adBuilder = newAdGroup.newAdBuilder();

          switch (adType) {
            case "TEXT_AD":
              adBuilder
                .withHeadlinePart1(ad.getHeadlinePart1())
                .withHeadlinePart2(ad.getHeadlinePart2())
                .withDescription(ad.getDescription())
                .withFinalUrl(ad.urls().getFinalUrl())
                .build();
              break;
            case "EXPANDED_TEXT_AD":
              adBuilder
                .withHeadlinePart1(ad.getHeadlinePart1())
                .withHeadlinePart2(ad.getHeadlinePart2())
                .withHeadlinePart3(ad.getHeadlinePart3())
                .withDescription1(ad.getDescription1())
                .withDescription2(ad.getDescription2())
                .withFinalUrl(ad.urls().getFinalUrl())
                .build();
              break;
            case "UNIVERSAL_APP_AD":
              adBuilder
                .withHeadline(ad.getHeadline())
                .withDescription(ad.getDescription())
                .withFinalUrl(ad.urls().getFinalUrl())
                .build();
              break;
            case "RESPONSIVE_DISPLAY_AD":
              adBuilder
                .withShortHeadline(ad.getShortHeadline())
                .withLongHeadline(ad.getLongHeadline())
                .withDescription(ad.getDescription())
                .withBusinessName(ad.getBusinessName())
                .withFinalUrl(ad.urls().getFinalUrl())
                .build();
              break;
            case "VIDEO_AD":
              adBuilder
                .withVideoId(ad.getVideoId())
                .withFinalUrl(ad.urls().getFinalUrl())
                .build();
              break;
            case "RESPONSIVE_SEARCH_AD":
              adBuilder
                .withHeadlines(ad.getHeadlines())
                .withDescriptions(ad.getDescriptions())
                .withFinalUrl(ad.urls().getFinalUrl())
                .build();
              break;
            // Add more cases for different ad types if necessary
            default:
              Logger.log('Ad type not handled: ' + adType);
              break;
          }
        }

        // Pause the original ad group
        adGroup.pause();
      }
    }
  }
}
