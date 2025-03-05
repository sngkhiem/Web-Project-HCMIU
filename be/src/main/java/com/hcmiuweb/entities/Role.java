package com.hcmiuweb.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Table;
import java.time.LocalDate;

@Table(name = "Role")
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoleID", nullable = false, updatable = false)
    private Long RoleID;

    @Column(name = "RoleName", nullable = false, length = 255)
    private String RoleName;

    public long getRoleID() {
        return RoleID;
    }
    public void setRoleID(long RoleID) {
        this.RoleID = RoleID;
    }
    public String getRoleName() {
        return RoleName;
    }
    public void setRoleName(String RoleName) {
        this.RoleName = RoleName;
    }
}