# Playbook — Git mirror với nhánh, tags, LFS và Releases

> Áp dụng cho công việc có quyền, với đầu ra tái lập được, có bằng chứng kiểm toán.

## 1. Kiểm kê phạm vi

1. Xác minh quyền sở hữu repo nguồn/đích, branch protections và license, chọn nơi đích rỗng nếu định dùng mirror push.

2. GitHub fork không tự đồng nghĩa sao lưu đầy đủ GitHub Releases, assets, issues, wiki và settings.

3. Lập manifest gồm branch refs, tag refs, Git LFS, submodules và releases.

## 2. Clone và integrity

1. Chạy git clone --mirror URL DEST.git trong phạm vi repo được phép.

2. Ghi git ls-remote --heads --tags, git show-ref, git fsck --full và kiểm tra shallow status.

3. Một số hidden refs không được máy chủ quảng bá; ghi hạn chế thay vì nói mirror tuyệt đối.

## 3. LFS, submodules, Releases

1. Dùng git lfs fetch --all origin và kiểm tra danh sách LFS object khi tính năng được sử dụng.

2. Đọc .gitmodules và kiểm tra từng submodule URL/commit cùng quyền truy cập.

3. Dùng GitHub Releases API có phân trang; lưu title, tag, prerelease, draft, asset IDs, sizes và digest/hash.

## 4. Push và so sánh

1. Chỉ chạy git push --mirror TARGET khi đích rỗng và được phép ghi đè; mirror push có thể xóa refs ở đích.

2. LFS push riêng; Release assets và metadata phải chuyển riêng, không thuộc Git refs.

3. Đối chiếu refs SHA, LFS OIDs, submodule pointers và release asset manifests; ghi MIGRATION_GAPS.md.

## Mẫu báo cáo

- Tên nhiệm vụ và phạm vi được phép
- Source ID, timestamp và SHA artifact
- Phương pháp/công cụ/phiên bản
- Kết quả kiểm thử tích cực và tiêu cực
- Hạn chế, blocker và quyết định PASS/PARTIAL/BLOCKED
- Owner và rollback point

## Tiêu chí nghiệm thu

- [ ] Không ra ngoài scope hoặc tiết lộ bí mật.
- [ ] Mỗi tuyên bố có evidence thực tế.
- [ ] Negative cases được kiểm chứng.
- [ ] Dữ liệu quan trọng có backup và rollback phù hợp.

Nguồn: https://git-scm.com/docs/git-clone
