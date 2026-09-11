(() => {
  const config = window.GEUMSEONG_MAP_CONFIG || {};
  const mapElement = document.getElementById('naver-map');
  if (!mapElement) return;

  const key = String(config.ncpKeyId || '').trim();
  if (!key) return; // API key not connected yet: keep the styled fallback.

  window.initGeumseongNaverMap = function () {
    if (!window.naver || !naver.maps) return;

    mapElement.innerHTML = '';

    const position = new naver.maps.LatLng(
      config.latitude,
      config.longitude
    );

    const map = new naver.maps.Map(mapElement, {
      center: position,
      zoom: config.zoom || 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      },
      mapDataControl: false
    });

    new naver.maps.Marker({
      position,
      map,
      title: config.placeName || '금성돈가스'
    });
  };

  window.navermap_authFailure = function () {
    mapElement.innerHTML = `
      <div class="map-fallback map-error">
        <strong>네이버 지도 인증을 확인해주세요.</strong>
        <p>Maps 애플리케이션의 Client ID와 허용 웹 주소를 확인하면 됩니다.</p>
      </div>`;
  };

  const script = document.createElement('script');

  script.src =
    `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(key)}`;

  script.async = true;
  script.defer = true;

  script.onload = function () {
    window.initGeumseongNaverMap();
  };

  document.head.appendChild(script);
})();
