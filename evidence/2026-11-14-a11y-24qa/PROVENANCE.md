# Bằng chứng gốc — Chrome 24/24 công khai, ngày 14/11/2026

Máy nguồn: `DESKTOP-PHA1S90`, chỉ đọc từ `C:\Users\Public\Documents\agent-harness-skillbook-a11y-qa-20261114\qa-evidence\`.
Runner sử dụng Chrome headless cùng profile cô lập, chạy trên trang công khai https://trinhtanphat.github.io/agent-harness-skillbook/.
Thời điểm JSON ghi nhận: `2026-11-14T13:39:43.122Z` (UTC). Commit mã đã kiểm thử: `ef3517bbcd1a855ce83142c334b0a3071fba710d`.

Ba tệp dưới đây được chuyển **nguyên vẹn từng byte** từ máy PHA vào GitHub. SHA-256 là kết quả Get-FileHash trên PHA; Git blob SHA là kết quả `git hash-object` trên **chính tệp nguồn** và được đối chiếu với blob trả về khi upload qua GitHub.

| Tệp | Kích thước byte | SHA-256 từ PHA | Git blob SHA nguồn = GitHub |
| --- | ---: | --- | --- |
| [browser-qa.json](browser-qa.json) | 8862 | `fea5e78e1266689a514e92bcf4f506e246f17c0f89bd911bee6731ebffa55fe4` | `7a9d5269a5012c72b57ee7084c8bc1f476df4f43` |
| [home-mobile-320.png](home-mobile-320.png) | 136772 | `1600f659d508cc6fa071450d982d9d047bd6946f2feede0b9acbfe66f06adec3` | `8dc91415f9b2cbae395cce669810b359a4c8fdc6` |
| [install-mobile-320.png](install-mobile-320.png) | 35081 | `1cfacb46faba6a8b4612591fa5833a772a2ccfc7dfa1487b995c688328b7e992` | `8eeefca33ea107f0ec93414c1cfb893a68e14b06` |

Kiểm tra nội dung JSON ngay trên PHA: `observations.length === 24`, mọi `result === PASS`, `isolatedProfile === true`, `url === https://trinhtanphat.github.io/agent-harness-skillbook/`. Không có ca FAIL.

Các file ảnh là ảnh chụp tĩnh của hai route ở viewport 320px, **không phải** minh chứng đánh giá WCAG toàn diện. Biên bản console: [live-browser-run.md](live-browser-run.md).

Chứng cứ được bảo toàn, không tái tạo từ ghi chép. Việc thêm vào repository không đồng nghĩa cài đặt hay thay đổi những dự án khác.
